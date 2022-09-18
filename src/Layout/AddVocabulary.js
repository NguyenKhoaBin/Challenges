import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import FormGroup from "../Input/FormGroup";
import Input from "../Input/Input";
import Label from "../Input/Label";
import TextArea from "../Input/TextArea";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useAuth } from "../Context/authContext";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";

const schema = yup.object({
  original: yup.string().required("Please enter English words"),
  meaning: yup.string().required("Please enter meaning of word"),
  description: yup.string().required("Please enter description of word"),
});

const AddVocabulary = () => {
  const { userInfo } = useAuth();
  const [uidCurr, setUidCurr] = useState();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      original: "",
      meaning: "",
      description: "",
    },
    resolver: yupResolver(schema),
  });
  document.title = "Add new word";

  useEffect(() => {
    setUidCurr(userInfo?.uid);
  }, [userInfo]);
  const handleAddNewWord = async (values) => {
    // if (!isValid) return;
    const cloneValues = { ...values };
    cloneValues.original = cloneValues.original.toLowerCase();
    cloneValues.meaning = cloneValues.meaning.toLowerCase();
    const colref = collection(db, "words");
    await addDoc(colref, {
      uid: uidCurr,
      ...cloneValues,
    });
    reset({
      original: "",
      meaning: "",
      description: "",
    });
    toast.success("Add new word successfully!");
  };

  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
      });
    }
  }, [errors]);
  return (
    <div className=" w-full h-full min-h-[calc(100vh-100px)] bg-imagePrimary bg-no-repeat bg-cover ">
      <div className="max-w-[800px] w-full mx-auto mini:pt-[75px] mini:px-5">
        <form className="py-[50px]" onSubmit={handleSubmit(handleAddNewWord)}>
          <FormGroup>
            <Label
              forHtml={"original"}
              className="mx-auto text-2xl text-[#ccc] font-bold"
            >
              Vocabulary you want to add
            </Label>
            <Input
              name={"original"}
              control={control}
              placeholder="Enter your vocabulary"
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label
              forHtml={"meaning"}
              className="mx-auto  text-2xl text-[#ccc] font-bold"
            >
              Meaning of the word
            </Label>
            <Input
              name={"meaning"}
              control={control}
              placeholder="Enter meaning of the word"
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label
              forHtml={"description"}
              className="mx-auto text-2xl text-[#ccc] font-bold"
            >
              Description of the word
            </Label>
            <TextArea
              control={control}
              name="description"
              placeholder="Enter description of the word"
            ></TextArea>
          </FormGroup>
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            className="block mx-auto mt-5 max-w-[350px]"
          >
            Add new
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddVocabulary;

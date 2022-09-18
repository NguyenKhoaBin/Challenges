import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import FormGroup from "../Input/FormGroup";
import Input from "../Input/Input";
import Label from "../Input/Label";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useAuth } from "../Context/authContext";
import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";

const schema = yup.object({
  meaning: yup.string().required("Please enter meaning of word"),
});

document.title = "Challenges";
const Challenges = () => {
  const { userInfo } = useAuth({});
  const [uidCurr, setUidCurr] = useState("");
  const [score, setScore] = useState(0);
  const [meaning, setMeaning] = useState("");
  const [original, setOriginal] = useState("");
  const [description, setDescription] = useState("");
  const [totalQuestion, setTotalQuestion] = useState(0);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      meaning: "",
    },
    resolver: yupResolver(schema),
  });
  document.title = "Challenges";

  useEffect(() => {
    setUidCurr(userInfo?.uid);
  }, [userInfo]);

  const handleSubmitMeaning = async (values) => {
    setTotalQuestion(totalQuestion + 1);
    console.log(meaning);
    console.log(values.meaning.toLowerCase());
    if (values.meaning.toLowerCase() === meaning) {
      setScore(score + 1);
      toast.success(`${values.meaning} is the correct answer`);
      reset({
        meaning: "",
      });
      return;
    }
    toast.warning(`${values.meaning} is the incorrect answer`);
    reset({
      meaning: "",
    });
  };

  useEffect(() => {
    if (totalQuestion === 15) {
      setScore(0);
      setTotalQuestion(0);
      const scoreCurr = (score / 15) * 100;
      toast.success(`You have achieved ${scoreCurr}% of your goal`);
    }
    async function fetch() {
      const q = await query(
        collection(db, "words"),
        where("uid", "==", uidCurr)
      );
      const querySnapshot = await getDocs(q);
      let result = [];
      await querySnapshot.forEach((doc) => {
        result.push(doc?.data());
      });
      const random = Math.floor(Math.random() * result?.length);
      setOriginal(result[random]?.original);
      setMeaning(result[random]?.meaning);
      setDescription(result[random]?.description);
    }
    fetch();
  }, [uidCurr, totalQuestion, score]);

  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
      });
    }
  }, [errors]);

  return (
    <div className="w-full h-full min-h-[calc(100vh-100px)] bg-imagePrimary bg-no-repeat bg-cover">
      <div className="max-w-[800px] w-full mx-auto py-[100px] mini:py-[150px] mini:px-5">
        <h3 className="text-3xl font-[500] text-[#ccc] text-center">
          Challenge yourself every day with 15 English words
        </h3>
        <p className="text-xl text-center font-[500] text-white my-5 flex flex-col items-center justify-center ">
          <span>total number of questions:{totalQuestion}</span>
          <span>Score : {score} </span>
        </p>
        <form onSubmit={handleSubmit(handleSubmitMeaning)}>
          <FormGroup>
            <Label
              forHtml={"meaning"}
              className="mx-auto mb-2 text-3xl font-bold text-cyan-300"
            >
              {original || ""}
            </Label>
            <span className="block text-center text-xl text-[#ccc] font-[400]">
              Description : {description}{" "}
            </span>
            <Input
              name={"meaning"}
              control={control}
              placeholder="Enter meaning of the word"
            ></Input>
          </FormGroup>

          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            className="block mx-auto mt-5 max-w-[350px]"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Challenges;

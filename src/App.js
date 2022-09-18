import { Routes, Route } from "react-router-dom";
import SignUpPage from "./Login/SignUpPage";
import SignInPage from "./Login/SignInPage";
import HomePages from "./Pages/HomePages";
import { AuthProvider } from "./Context/authContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Challenges from "./Layout/Challenges";
import AddVocabulary from "./Layout/AddVocabulary";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePages></HomePages>}>
            <Route
              path="/Add-new"
              element={<AddVocabulary></AddVocabulary>}
            ></Route>
            <Route
              path="/Challenges"
              element={<Challenges></Challenges>}
            ></Route>
          </Route>
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </>
  );
}

export default App;

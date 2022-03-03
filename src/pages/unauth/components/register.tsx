import styles from "./register.module.css";
import { Button, Form, Modal, Toast, useFormState } from "@douyinfe/semi-ui";
import { useAuth } from "../../../context/auth";
import { useLogin } from "../../../utils/hooks/useLogin";
import { setLocalStorage } from "../../../utils";
import { useRegister } from "../../../utils/hooks/useRegister";
import { useEffect } from "react";

interface props {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Register = (props: props) => {
  const { setLogin } = props;

  const SubmitButton = ({
    setLogin,
  }: {
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    const formState = useFormState();
    const mutation = useRegister();
    const checkPasswd = (str1: string, str2: string) => {
      return str1 === str2;
    };
    const submit = ({
      username,
      password,
      cpassword,
    }: {
      username: string;
      password: string;
      cpassword: string;
    }) => {
      if (!checkPasswd(password, cpassword)) {
        Toast.info("密码不一致");
        return;
      }
      //@ts-ignore
      mutation.mutate({ username, password });
    };
    useEffect(() => {
      if (mutation.isSuccess) {
        //@ts-ignore
        if (mutation.data.status) {
          Toast.info("注册失败");
        } else {
          //@ts-ignore
          Toast.info("注册成功");
          setLogin(true);
        }
      }
      if (mutation.isError) {
        Toast.info("注册失败");
      }
    }, [mutation.isSuccess, mutation.isError]);

    return (
      <Button
        loading={mutation.isLoading}
        htmlType="submit"
        block
        style={{ marginTop: "12px" }}
        onClick={() => submit(formState.values)}
      >
        注册
      </Button>
    );
  };

  return (
    <div className={`${styles.register}`}>
      <Modal></Modal>
      <h2 className={`${styles.header}`}>请注册</h2>
      <Form className="form" labelPosition="inset">
        <Form.Input field="username" required />
        <Form.Input field="password" required />
        <Form.Input field="cpassword" required />
        <SubmitButton setLogin={setLogin} />
      </Form>
    </div>
  );
};

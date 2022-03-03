import { Button, Form, Toast, useFormState } from "@douyinfe/semi-ui";
import styles from "./login.module.css";
import { useNavigate } from "react-router";
import { useLogin } from "../../../utils/hooks/useLogin";
import { setLocalStorage } from "../../../utils";
import { useAuth } from "../../../context/auth";
import { useMount } from "../../../utils/hooks/useMount";
import { useEffect } from "react";

export const Login = () => {
  const SubmitButton = () => {
    const formState = useFormState();
    const { refetch } = useAuth();
    //const navigate = useNavigate()
    const mutation = useLogin();
    const submit = ({
      username,
      password,
    }: {
      username?: string;
      password?: string;
    }) => {
      //@ts-ignore
      mutation.mutate({ username, password });
    };
    useEffect(() => {
      if (mutation.isSuccess) {
        //@ts-ignore
        if (mutation.data.status) {
          Toast.info("登录失败");
        } else {
          //@ts-ignore
          setLocalStorage("__auth_provider_token__", mutation.data?.user.token);
          refetch();
        }
      }
      if (mutation.isError) {
        Toast.info("用户名或密码错误");
      }
    }, [mutation.isSuccess, mutation.isError]);

    return (
      <Button
        loading={mutation.isLoading}
        block
        style={{ marginTop: "12px" }}
        onClick={() => submit(formState.values)}
      >
        登录
      </Button>
    );
  };

  return (
    <div className={`${styles.login}`}>
      <h2 className={`${styles.header}`}>请登录</h2>
      <Form className="form" labelPosition="inset">
        <Form.Input field="username" required />
        <Form.Input field="password" required />
        <SubmitButton />
      </Form>
    </div>
  );
};

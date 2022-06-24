import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { PROFILE_ROUTE, REGISTRATION_ROUTE } from "../../routes/routes";

import enterIcon from "../../assets/images/enter-icon.png";
import styles from "./LoginForm.module.scss";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useActions();

  const onFinish = async (values) => {
    await Promise.all([login(values.email, values.password)]);
    localStorage.getItem("token") && (await navigate(PROFILE_ROUTE));
  };

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <div className={styles.info}>
          <img src={enterIcon} alt="enter-icon" />
          <h2>Войти в аккаунт</h2>
          <span>Пожалуйста, войдите в свой аккаунт</span>
        </div>
        <div className={styles.mainBlock}>
          <div>
            <Form
              name="form"
              className={styles.form}
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                className={styles.formItem}
                rules={[{ required: true, message: "Введите Ваш email" }]}
              >
                <Input
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                className={styles.formItem}
                rules={[{ required: true, message: "Введите Ваш пароль" }]}
              >
                <Input
                  className={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Пароль"
                />
              </Form.Item>
              <Form.Item className={styles.button}>
                <div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Войти
                  </Button>
                </div>
                <Link to={REGISTRATION_ROUTE}>
                  <div className={styles.other}>
                    <span>Зарегистрироваться</span>
                  </div>
                </Link>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

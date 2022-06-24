import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { LOGIN_ROUTE, PROFILE_ROUTE } from "../../routes/routes";

import registerIcon from "../../assets/images/register-icon.png";
import styles from "./RegisterForm.module.scss";

const RegisterForm = () => {
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { registration } = useActions();

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("fistName", values.name);
    formData.append("email", values.email);
    formData.append("dateOfBirth", values.date_of_birth);
    formData.append("gender", values.gender);
    formData.append("img", image);
    formData.append("password", values.password);
    await Promise.all([registration(formData)]);
    localStorage.getItem("token") && (await navigate(PROFILE_ROUTE));
  };

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <div className={styles.info}>
          <img src={registerIcon} alt="register-icon" />
          <h2>Регистрация</h2>
          <span>Пожалуйста, введите данные</span>
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
                name="name"
                className={styles.formItem}
                rules={[
                  {
                    required: true,
                    message: "Введите Ваше имя",
                  },
                ]}
              >
                <Input
                  className={styles.input}
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Имя"
                />
              </Form.Item>
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
                name="date_of_birth"
                className={styles.formItem}
                rules={[{ required: true, message: "Выберите дату рождения" }]}
              >
                <DatePicker
                  className={styles.input}
                  placeholder="Дата рождения"
                  onChange={(date) => setDateOfBirth(date)}
                />
              </Form.Item>
              <Form.Item
                name="gender"
                className={styles.formItem}
                rules={[{ required: true, message: "Выберите пол" }]}
              >
                <Select
                  className={styles.select}
                  placeholder="Выберите Ваш пол"
                  onChange={(value) => {
                    setGender(value);
                  }}
                >
                  <Select.Option className={styles.option} value="мужской">
                    Мужской
                  </Select.Option>
                  <Select.Option className={styles.option} value="женский">
                    Женский
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="upload"
                className={styles.formItem}
                rules={[{ required: true, message: "Загрузите фото профиля" }]}
              >
                <div>
                  <span style={{ display: "block", marginBottom: 5 }}>
                    Загрузите Ваше фото:
                  </span>
                  <input
                    name="myFile"
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
              </Form.Item>
              <Form.Item
                name="password"
                className={styles.formItem}
                rules={[
                  {
                    required: true,
                    message: "Введите Ваш пароль (от 3 до 32 символов)",
                    max: 32,
                    min: 3,
                  },
                ]}
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
                    Зарегистрироваться
                  </Button>
                </div>
                <Link to={LOGIN_ROUTE}>
                  <div className={styles.other}>
                    <span>Войти</span>
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

export default RegisterForm;

'use client';

import { Form, Input, Button, Checkbox, message, Row, Col, Card } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { LoginRequest } from '@/types/auth/req';
import query from '@/services/core/api';
import { useTranslations } from 'next-intl';
import { Link } from '../../../../../i18n.config';
import Validate from '@/validate';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from '../../../../../i18n.config';
import { ROUTE_APP } from '@/constants/config/route';

export default function LoginPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const { mutateAsync: loginMutate } = query.auth.loginMutation();
  const t = useTranslations();
  const validate = new Validate();
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (values: LoginRequest) => {
    setLoading(true);
    try {
      const data = await loginMutate(values);
      login(data);

      router.push(ROUTE_APP.HOME);
    } catch (error) {}
    
    setLoading(false);
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "100vh", background: "#f4f4f4" }}
    >
      <Col xs={24} sm={16} md={12} lg={8} xl={6}>
        <Card style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-xl font-semibold text-gray-800 text-center">
              { t('auth.label.welcome_back') }
            </h1>
            <p className="text-sm text-gray-500">{ t('auth.form_title') }</p>
          </div>

          {/* Form */}
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="email"
              rules={validate.authValidate().email}
            >
              <Input prefix={<UserOutlined />} placeholder={t('auth.placeholder.email')} />
            </Form.Item>

            <Form.Item
              name="password"
              rules={validate.authValidate().password}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder={t('auth.placeholder.password')}
              />
            </Form.Item>

            <Form.Item>
              <div className="flex justify-between items-center">
                <Checkbox>{ t('auth.label.remember_me') }</Checkbox>
                <Link href={"/auth/forgot-password"} className="text-xs text-blue-500 hover:text-blue-600">
                  { t('auth.label.forgot_password') + "?" }
                </Link>
              </div>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                { t('auth.label.login') }
              </Button>
            </Form.Item>
          </Form>

          {/* Social login */}
          <div className="text-center">
            <p className="text-gray-500 text-sm mb-3">{ t('auth.label.other_login') }</p>
            <div className="flex justify-center">
              <Button
                icon={<GoogleOutlined />}
                shape="circle"
                className="!flex items-center justify-center"
                onClick={() => message.info("Google login coming soon")}
              />
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
}

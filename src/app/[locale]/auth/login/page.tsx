'use client';

import { Form, Input, Button, Checkbox, message, Row, Col, Card } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';

export default function LoginPage() {
  const onFinish = () => {
    message.success('Login successful!');
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
              Welcome Back
            </h1>
            <p className="text-sm text-gray-500">Sign in to your account</p>
          </div>

          {/* Form */}
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your password"
              />
            </Form.Item>

            <Form.Item>
              <div className="flex justify-between items-center">
                <Checkbox>Remember me</Checkbox>
                <a className="text-xs text-blue-500 hover:text-blue-600">
                  Forgot password?
                </a>
              </div>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
          </Form>

          {/* Social login */}
          <div className="text-center">
            <p className="text-gray-500 text-sm mb-3">Or continue with</p>
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

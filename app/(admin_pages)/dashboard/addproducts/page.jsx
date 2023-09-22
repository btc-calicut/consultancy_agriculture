"use client";

import { Form, Input, Button, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const AddProductsPage = () => {
  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  return (
    <section className="min-h-full">
      <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8 bg-white shadow">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Add products
        </h1>
      </div>

      <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Form name="dynamic_form_nutritional_facts" onFinish={onFinish}>
          <div className="outline grid gap-4 text-sm grid-cols-1 sm:grid-cols-3"></div>

          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter the description" },
            ]}
          >
            <Input placeholder="Description" />
          </Form.Item>

          {/* Nested Form.List */}
          <Form.Item label="Nutritional Facts">
            <Form.List name="nutritionalFacts" required>
              {(fields, actions) => (
                <div className="flex flex-col gap-y-2">
                  {fields.map((field) => (
                    <Space key={field.key}>
                      <Form.Item noStyle name={[field.name, "nutrient"]}>
                        <Input placeholder="Nutrient" required />
                      </Form.Item>
                      <Form.Item noStyle name={[field.name, "quantitiy"]}>
                        <Input placeholder="Quantitiy" required />
                      </Form.Item>
                      <CloseOutlined
                        onClick={() => {
                          actions.remove(field.key);
                        }}
                      />
                    </Space>
                  ))}
                  <Button type="dashed" onClick={() => actions.add()} block>
                    + Add Sub Item
                  </Button>
                </div>
              )}
            </Form.List>
          </Form.Item>

          <Form.Item
            name="benefits"
            label="Benefits"
            rules={[{ required: true, message: "Please enter the benefits" }]}
          >
            <Input placeholder="Benefits" />
          </Form.Item>

          <Form.Item
            name="image"
            label="Image"
            rules={[{ required: true, message: "Please enter the image URL" }]}
          >
            <Input placeholder="Image URL" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default AddProductsPage;

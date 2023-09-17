"use client";

// const AddProductsPage = () => {
//   return (
//     <section className="min-h-full">
//       <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8 bg-white shadow">
//         <h1 className="text-3xl font-bold tracking-tight text-gray-900">
//           Add new Products
//         </h1>
//       </div>

//       <div className="relative mx-auto px-4 py-6 sm:px-6 lg:px-8">
//         <div className="absolute inset-0 bg-red-100">
//           <div className="grid"></div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AddProductsPage;

import React, { useState } from "react";
import { Form, Input, Button, Space, Row, Col } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const YourFormComponent = () => {
  const [form] = Form.useForm();
  const [nutritionalFacts, setNutritionalFacts] = useState([
    { key: "", value: "" },
  ]);

  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  const addNutritionalFact = () => {
    setNutritionalFacts([...nutritionalFacts, { key: "", value: "" }]);
  };

  const removeNutritionalFact = (index) => {
    const newNutritionalFacts = [...nutritionalFacts];
    newNutritionalFacts.splice(index, 1);
    setNutritionalFacts(newNutritionalFacts);
  };

  return (
    <Form
      form={form}
      name="dynamic_form_nutritional_facts"
      onFinish={onFinish}
      initialValues={{
        nutritional_facts: nutritionalFacts,
      }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter the description" },
            ]}
          >
            <Input placeholder="Description" />
          </Form.Item>
        </Col>
      </Row>

      <Form.List name="nutritional_facts" initialValue={nutritionalFacts}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, "key"]}
                  fieldKey={[fieldKey, "key"]}
                  rules={[{ required: true, message: "Please enter the key" }]}
                >
                  <Input placeholder="Key" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "value"]}
                  fieldKey={[fieldKey, "value"]}
                  rules={[
                    { required: true, message: "Please enter the value" },
                  ]}
                >
                  <Input placeholder="Value" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Add Nutritional Fact
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

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
  );
};

export default YourFormComponent;

import React from 'react';

const GoodModal = () => {
  const { isModalVisible } = props;
  return (
    <Modal title={modalTitle} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Form name="basic" {...layout}>
        <Form.Item
          label="商品名称"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input title!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="价格"
          name="price"
          rules={[
            {
              required: true,
              message: 'Please input price!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="原价"
          name="price"
          rules={[
            {
              required: true,
              message: 'Please input price!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="SKU"
          name="price"
          rules={[
            {
              required: true,
              message: 'Please input price!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GoodModal;

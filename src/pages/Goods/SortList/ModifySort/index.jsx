import React, { useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Form, Input, Button, Image } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { connect, history } from 'umi';

const index = ({ record, dispatch }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    let useRecord = {};
    useRecord.name = record.name;
    form.setFieldsValue(useRecord);
  }, []);
  //富文本内容
  let content = record.description;
  //form布局
  const layout = {
    labelCol: {
      span: 2,
    },
    wrapperCol: {
      span: 22,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  const routes = [
    {
      breadcrumbName: '首页',
    },
    {
      breadcrumbName: '分类列表',
    },
    {
      breadcrumbName: '编辑分类',
    },
  ];
  //表单提交函数
  const onFinish = (values) => {
    history.go(-1);
    dispatch({
      type: 'category/updateCategory',
      payload: {
        values,
        id: record.id,
      },
    });
  };
  return (
    <PageHeaderWrapper breadcrumb={{ routes }} title="编辑分类">
      <Form {...layout} name="basic" form={form} onFinish={onFinish}>
        <Card>
          <h3>分类名称</h3>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: '请输入分类名称',
              },
            ]}
          >
            <Input style={{ width: '50%' }} placeholder="请输入分类名称" />
          </Form.Item>
          <h3>商品图片</h3>
          <Image
            width={100}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
          <Button style={{ marginLeft: '10px' }}>更换图片</Button>
          <h3 style={{ marginTop: '10px' }}>分类描述</h3>
          <Editor
            apiKey="le7m6pa3qo2m11ndjkq0jwkxezfw0n3vtrv19ql58732b55f"
            initialValue={record.description}
            init={{
              height: 300,
              language: 'zh_CN',
              menubar: false,
              plugins: [
                'advlist autolink lists link image',
                'charmap print preview anchor help',
                'searchreplace visualblocks code',
                'insertdatetime media table paste wordcount',
              ],
              toolbar:
                'undo redo | formatselect | bold italic | link image | \
                      alignleft aligncenter alignright | \
                      bullist numlist outdent indent | help',
            }}
            onEditorChange={(value) => {
              content = value;
            }}
          />
        </Card>
        <Card style={{ marginTop: '15px' }}>
          <h3>关联商品</h3>
        </Card>
        <Card
          style={{
            position: 'fixed',
            bottom: '0px',
            right: '0px',
            width: '100%',
            height: '80px',
          }}
        >
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Card>
      </Form>
    </PageHeaderWrapper>
  );
};
const mapStateToProps = ({ category }) => {
  return {
    record: category.Record,
  };
};
export default connect(mapStateToProps)(index);

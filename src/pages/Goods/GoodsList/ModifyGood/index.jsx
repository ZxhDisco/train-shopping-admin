import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Form, Input, Button, Radio, Select, Spin } from 'antd';
import { PayCircleOutlined } from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react';
import { connect, history } from 'umi';
import ModGoodPic from './components/ModGoodPic';

const index = ({ dispatch, record, usefulRecord, loading }) => {
  const [form] = Form.useForm();
  let content = usefulRecord.post_content;
  useEffect(() => {
    form.setFieldsValue(record);
  }, []);

  //标签多选器
  let tags = usefulRecord.tags.map((item) => {
    return item.name;
  });
  let children = tags;
  const toChildren_1 = (value) => {
    let values = String(value);
    children = values.split(',');
  };
  //分类多选器
  let categories = usefulRecord.categories.map((item) => {
    return item.name;
  });
  let children2 = categories;
  const toChildren_2 = (value) => {
    let values_2 = String(value);
    children2 = values_2.split(',');
  };
  //提交表单
  const onFinish = (values) => {
    history.go(-1);
    dispatch({
      type: 'goodList/updateGood',
      payload: {
        params: values,
        id: usefulRecord.ID,
      },
    });
  };
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
      breadcrumbName: '商品列表',
    },
    {
      breadcrumbName: '编辑商品',
    },
  ];
  return (
    <Spin spinning={loading}>
      <PageHeaderWrapper breadcrumb={{ routes }} title="编辑商品">
        <Form {...layout} name="basic" form={form} onFinish={onFinish}>
          <Card>
            <h3>基础信息</h3>
            <Form.Item label="商品名称" name="title" rules={[{ required: true }]}>
              <Input style={{ width: '50%' }} placeholder="请输入商品名称，最多255个字符" />
            </Form.Item>
            <Form.Item label="价格" name="price" rules={[{ required: true }]}>
              <Input
                style={{ width: '20%' }}
                placeholder="请输入商品售价"
                prefix={<PayCircleOutlined />}
              />
            </Form.Item>
            <Form.Item label="原价" name="regular_price">
              <Input style={{ width: '20%' }} placeholder="请输入划线价" />
            </Form.Item>
            <Form.Item label="SKU" name="sku">
              <Input style={{ width: '50%' }} placeholder="请输入商品SKU" />
            </Form.Item>
            <Form.Item label="商品分类">
              <Select
                mode="tags"
                open={false}
                style={{ width: '50%' }}
                placeholder="+ 添加分类"
                onChange={toChildren_2}
                defaultValue={children2}
              >
                {children2}
              </Select>
            </Form.Item>
            <Form.Item label="商品标签">
              <Select
                mode="tags"
                open={false}
                style={{ width: '50%' }}
                placeholder="+ 添加标签"
                onChange={toChildren_1}
                defaultValue={children}
              >
                {children}
              </Select>
            </Form.Item>
            <Form.Item name="post_status" label="是否上架">
              <Radio.Group>
                <Radio value="publish">上架</Radio>
                <Radio value="private">下架</Radio>
              </Radio.Group>
            </Form.Item>

            <span>商品图片:</span>
            {/* <ModGoodPic /> */}
          </Card>
          <Card style={{ marginTop: '15px' }}>
            <h3>商品详情</h3>
            <Editor
              apiKey="le7m6pa3qo2m11ndjkq0jwkxezfw0n3vtrv19ql58732b55f"
              initialValue={usefulRecord.post_content}
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
    </Spin>
  );
};
const mapStateToProps = ({ goodList, loading }) => {
  return {
    record: goodList.recordShow,
    usefulRecord: goodList.usefulRecord,
    loading: loading.effects['goodList/getGood'],
  };
};
export default connect(mapStateToProps)(index);

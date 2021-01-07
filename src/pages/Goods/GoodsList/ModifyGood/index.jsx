import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Form, Input, Button, Radio, Select, Upload, Modal } from 'antd';
import { PayCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

class index extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ],
  };
  //upload处理
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });
  //富文本change方法
  handleEditorChange = (e) => {
    console.log(e.target.getContent());
  };
  render() {
    //标签多选器
    const children = [];
    //分类多选器
    const children2 = [];
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
    //upload用到的参数
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <PageHeaderWrapper breadcrumb={{ routes }} title="编辑商品">
        <Form {...layout} name="basic">
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
            <Form.Item label="商品分类" name="categories">
              <Select mode="tags" open={false} style={{ width: '50%' }} placeholder="+ 添加分类">
                {children2}
              </Select>
            </Form.Item>
            <Form.Item label="商品标签" name="tags">
              <Select mode="tags" open={false} style={{ width: '50%' }} placeholder="+ 添加标签">
                {children}
              </Select>
            </Form.Item>
            <Form.Item name="post_status" label="是否上架">
              <Radio.Group>
                <Radio value="publish">上架</Radio>
                <Radio value="private">下架</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="gallery" label="商品图片">
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={this.handleCancel}
              >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </Form.Item>
          </Card>
          <Card style={{ marginTop: '15px' }}>
            <h3>商品详情</h3>
            <Form.Item name="content">
              <Editor
                apiKey="le7m6pa3qo2m11ndjkq0jwkxezfw0n3vtrv19ql58732b55f"
                initialValue={'111'}
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
                onChange={this.handleEditorChange}
              />
            </Form.Item>
          </Card>
          <Card
            style={{
              position: 'fixed',
              bottom: '0px',
              right: '0px;',
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
  }
}
export default index;

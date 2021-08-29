import { Modal, Form, Input, Typography, Alert, Button, Divider } from 'antd'
import { useSubmit } from '../hooks/useSubmit'
import SuccessModal from './SuccessModal'
import { useToggle } from 'react-use'
import { useState } from 'react'
import { Data } from './typings'
const { Title } = Typography

const formatValues = (values: any): Data => {
  return {
    email: values.email,
    name: values.name
  }
}

const InviteModal = ({ visible, onCancel }: { visible: boolean, onCancel: any }) => {
  const onSubmit = useSubmit()
  const [onSuccess, toggleSuccess] = useToggle(false)
  const [loading, setLoading] = useState(false)
  const [failedMessage, setFailedMessage] = useState('')

  return (<>
    <Modal visible={visible} onCancel={onCancel} footer={null}>
      <Title>Request an invite</Title>
      <Divider />
      <Form onFinish={async (values) => {
        setFailedMessage('')
        const formValues = formatValues(values)
        try {
          setLoading(true)
          const res = await onSubmit(formValues)
          if (res.ok) {
            toggleSuccess(true)
            onCancel()
          } else {
            setFailedMessage(res.statusText)
          }
        } catch (error) {
          setFailedMessage('Network error， please refresh the page')
          console.log(error)
        } finally {
          setLoading(false)
        }
      }}>
        <Form.Item
          label=""
          name="name"
          rules={[{ required: true, message: 'Please input your full name' }]}
        >
          <Input
            placeholder="Name"
          />
        </Form.Item>

        <Form.Item
          label=""
          name="email"
          rules={[{ required: true, message: 'Please input your email', type: 'email' }]}
        >
          <Input
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          label=""
          name="secondConfirmEmail"
          rules={[{ required: true, message: 'Please input your email', type: 'email', validateTrigger: "onSubmit" }, ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('email').trim() === value.trim()) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two email address that you entered do not match!'));
            },
          }),]}

        >
          <Input
            placeholder="Confirm email"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>Send</Button>
        </Form.Item>
        {failedMessage && <Alert
          message={failedMessage}
          type="error"
        />}

      </Form>
    </Modal>
    <SuccessModal visible={onSuccess} onCancel={() => toggleSuccess(false)} />
  </>)
}

export default InviteModal

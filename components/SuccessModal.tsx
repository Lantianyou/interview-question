import { Button, Modal, Typography, Divider } from 'antd'
const { Title, Paragraph } = Typography

interface ISuccessModal {
  visible: boolean
  onCancel: (nextValue?: any) => void
}

const SuccessModal = ({ visible, onCancel }: ISuccessModal) => {
  return <Modal visible={visible} onCancel={onCancel} footer={null} >
    <div className="flex justify-center"><Title className="mx-auto">All done!</Title></div>
    {/* <Divider /> */}
    <Paragraph>You will be one of the first to experience Broccoli & Co. when we launch</Paragraph>
    <Button onClick={onCancel} className="w-full">OK</Button>

  </Modal>
}

export default SuccessModal
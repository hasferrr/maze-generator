import { Modal, Button, Form, InputGroup, FloatingLabel } from 'react-bootstrap'
import { useGridContext } from '../hooks/useGridContext'
import { useState } from 'react'

const Settings = ({ show, onHide }: {
  show: boolean
  onHide: () => void
}) => {
  const { size, setSize } = useGridContext()

  const [tempSize, setTempSize] = useState<number | undefined>(size[0])
  const [ratio, setRatio] = useState<'1:1' | '1:2'>('1:2')

  const newSize = !tempSize
    ? size[0] : (tempSize < 1 ? 1 : (tempSize > 32 ? 32 : tempSize))

  const handleSetTempSize = (n?: number) => {
    setTempSize(Number.isNaN(n) ? undefined : n)
  }

  const handleApply = () => {
    setSize([newSize, newSize * (ratio === '1:1' ? 1 : 2)])
    onHide()
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-lg">Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>Grid Settings</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text className="flex justify-center">Size</InputGroup.Text>
          <InputGroup.Text className="w-20 flex justify-center">
            {newSize} x {newSize * (ratio === '1:1' ? 1 : 2)}
          </InputGroup.Text>
          <Form.Control
            className="text-center"
            placeholder="10"
            value={tempSize ? tempSize : ''}
            onChange={(e) => handleSetTempSize(Number(e.target.value))}
          />
        </InputGroup>
        <FloatingLabel label="Grid Ratio">
          <Form.Select value={ratio} onChange={(e) => setRatio(e.target.value as typeof ratio)}>
            <option value="1:2">1:2</option>
            <option value="1:1">1:1</option>
          </Form.Select>
        </FloatingLabel>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleApply}>Apply</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Settings

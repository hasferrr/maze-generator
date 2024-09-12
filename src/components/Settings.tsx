import { useState } from 'react'
import { Modal, Button, Form, InputGroup, FloatingLabel, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useGridContext } from '../hooks/useGridContext'
import { useAnimation } from '../hooks/useAnimation'

const Settings = ({ show, onHide }: {
  show: boolean
  onHide: () => void
}) => {
  const { size, setSize } = useGridContext()
  const { clearState } = useAnimation()

  const [tempSize, setTempSize] = useState<number | undefined>(size[0])
  const [ratio, setRatio] = useState<'1:1' | '1:2'>('1:2')

  const newSize = !tempSize
    ? size[0] : (tempSize < 2 ? 2 : (tempSize > 32 ? 32 : tempSize))

  const handleSetTempSize = (n?: number) => {
    setTempSize(Number.isNaN(n) ? undefined : n)
  }

  const handleApply = () => {
    clearState()
    setSize([newSize, newSize * (ratio === '1:1' ? 1 : 2)])
    onHide()
  }

  const sizeInfoTooltip = (() => {
    if (!tempSize) return <></>
    if (tempSize < 2) return <Tooltip>Minimum is 2</Tooltip>
    if (tempSize > 32) return <Tooltip>Maximum is 32</Tooltip>
    return (
      <Tooltip>
        {'It will be '}<span className='font-bold'>{newSize}</span>
        {'x2+1 = '}<span className='font-bold'>{newSize * 2 + 1}</span>
      </Tooltip>
    )
  })()

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
            {newSize * 2 + 1} x {newSize * (ratio === '1:1' ? 1 : 2) * 2 + 1}
          </InputGroup.Text>
          <OverlayTrigger
            key={'top'}
            placement={'top'}
            overlay={sizeInfoTooltip}
          >
            <Form.Control
              className="text-center"
              value={tempSize ? tempSize : ''}
              onChange={(e) => handleSetTempSize(Number(e.target.value))}
            />
          </OverlayTrigger>
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

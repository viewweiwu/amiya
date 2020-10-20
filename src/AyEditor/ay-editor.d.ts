export interface AyEditorProps {
  /** 值 */
  value?: any
  /** change 事件监听 */
  onChange?: (value: string) => void
  disabled?: boolean
  placeholder?: string
}

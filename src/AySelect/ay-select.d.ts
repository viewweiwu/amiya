import { Option } from '../AyForm/ay-form'
import { SelectProps } from 'antd/lib/select'

interface AySelectProps extends SelectProps<any> {
  options?: Array<Option>
}

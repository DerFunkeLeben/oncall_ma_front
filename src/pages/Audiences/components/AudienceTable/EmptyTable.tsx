import Table from 'components/Table/Table'
import helpMessages from 'constants/helpMessages'
import { IconAudiences } from 'assets/icons'
import tableStyles from 'components/Table/TableBase.module.scss'
import { header } from './CreateAudienceTable'

function EmptyTable({ handleAddBtn }: { handleAddBtn?: () => void }) {
  return (
    <>
      <Table headers={header} handleAddBtn={handleAddBtn} addBtnEnabled={Boolean(handleAddBtn)} />
      <div className={tableStyles.emptyTableWrapper}>
        <IconAudiences />
        <div
          className={tableStyles.emptyCaption}
          dangerouslySetInnerHTML={{ __html: helpMessages.EMPTY_DOCTORS_TABLE }}
        />
      </div>
    </>
  )
}

export default EmptyTable

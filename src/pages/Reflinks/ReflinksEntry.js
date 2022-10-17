//
//  Libraries
//
import { useEffect } from 'react'
import { Grid } from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Controls
//
import MyButton from '../../components/controls/MyButton'
import MyInput from '../../components/controls/MyInput'
import MySelect from '../../components/controls/MySelect'
import { useMyForm, MyForm } from '../../components/useMyForm'
//
//  Form Initial Values
//
const initialFValues = {
  rid: 0,
  rref: '',
  rdesc: '',
  rlink: '',
  rwho: '',
  rtype: ''
}
//
//  Options
//
let OptionsType = [
  {
    id: 'pdf',
    title: 'PDF'
  },
  {
    id: 'webdoc',
    title: 'Web Document'
  },
  {
    id: 'youtube',
    title: 'YouTube Video'
  }
]
//
//  Global Variable
//
let actionUpdate = false
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStart = false
const debugModule = 'ReflinksEntry'

//=====================================================================================
export default function ReflinksEntry(props) {
  const { addOrEdit, recordForEdit } = props

  //...................................................................................
  //
  // Validate the fields
  //
  const validate = (fieldValues = values) => {
    if (debugFunStart) console.log('validate')
    if (debugLog) console.log(fieldValues)
    //
    //  Load previous errors
    //
    let errorsUpd = { ...errors }
    //
    //  Validate current field
    //
    if ('rref' in fieldValues)
      errorsUpd.rref = fieldValues.rref === '' ? 'This field is required.' : ''
    if ('rdesc' in fieldValues)
      errorsUpd.rdesc = fieldValues.rdesc === '' ? 'This field is required.' : ''
    if ('rlink' in fieldValues)
      errorsUpd.rlink = fieldValues.rlink === '' ? 'This field is required.' : ''
    if ('rtype' in fieldValues)
      errorsUpd.rtype = fieldValues.rtype === '' ? 'This field is required.' : ''
    if ('rwho' in fieldValues)
      errorsUpd.rwho = fieldValues.rwho === '' ? 'This field is required.' : ''
    //
    //  Set the errors
    //
    setErrors({
      ...errorsUpd
    })
    //
    //  Check if every element within the errorsUpd object is blank, then return true (valid), but only on submit when the fieldValues=values
    //
    if (fieldValues === values) {
      return Object.values(errorsUpd).every(x => x === '')
    }
  }
  //...................................................................................
  //
  //  UseMyForm
  //
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } = useMyForm(
    initialFValues,
    true,
    validate
  )
  //...................................................................................
  //.  Submit form
  //...................................................................................
  const handleSubmit = e => {
    if (debugFunStart) console.log('handleSubmit')
    e.preventDefault()
    //
    //  Validate & Update
    //
    if (validate()) {
      if (debugLog) console.log('values ', values)
      const { ...UpdateValues } = { ...values }
      if (debugLog) console.log('UpdateValues ', UpdateValues)
      //
      //  Update database
      //
      if (debugLog) console.log('UpdateValues ', UpdateValues)
      addOrEdit(UpdateValues, resetForm)
    }
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................

  if (debugFunStart) console.log(debugModule)
  //
  //  On change of record, set State
  //
  useEffect(() => {
    if (debugLog) console.log('useEffect')
    if (debugLog) console.log('recordForEdit ', recordForEdit)
    //
    //  Update form values
    //
    if (recordForEdit) {
      setValues({
        ...recordForEdit
      })
    }
    // eslint-disable-next-line
  }, [recordForEdit])
  //
  //  Disable/Allow entry
  //
  recordForEdit === null ? (actionUpdate = false) : (actionUpdate = true)
  if (debugLog) console.log('actionUpdate', actionUpdate)
  //
  //  Button Text
  //
  let submitButtonText
  actionUpdate ? (submitButtonText = 'Update') : (submitButtonText = 'Add')
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <MyForm onSubmit={handleSubmit}>
        <Grid container>
          {/*------------------------------------------------------------------------------ */}

          <Grid item xs={8}>
            <MyInput
              name='rref'
              label='Reference'
              value={values.rref}
              onChange={handleInputChange}
              error={errors.rref}
              disabled={actionUpdate}
            />
          </Grid>
          {/*------------------------------------------------------------------------------ */}
          {actionUpdate ? (
            <Grid item xs={4}>
              <MyInput name='rid' label='ID' value={values.rid} disabled={true} />
            </Grid>
          ) : null}
          {/*------------------------------------------------------------------------------ */}
          <Grid item xs={12}>
            <MyInput
              name='rdesc'
              label='Description'
              value={values.rdesc}
              onChange={handleInputChange}
              error={errors.rdesc}
            />
          </Grid>
          {/*------------------------------------------------------------------------------ */}
          <Grid item xs={12}>
            <MyInput
              name='rlink'
              label='Link'
              value={values.rlink}
              onChange={handleInputChange}
              error={errors.rlink}
            />
          </Grid>
          {/*------------------------------------------------------------------------------ */}
          <Grid item xs={12}>
            <MyInput
              name='rwho'
              label='Who'
              value={values.rwho}
              onChange={handleInputChange}
              error={errors.rwho}
            />
          </Grid>
          {/*------------------------------------------------------------------------------ */}

          <Grid item xs={12}>
            <MySelect
              key={OptionsType.id}
              name='rtype'
              label='Type'
              value={values.rtype}
              onChange={handleInputChange}
              error={errors.rtype}
              options={OptionsType}
            />
          </Grid>
          {/*------------------------------------------------------------------------------ */}
          <Grid item xs={2}>
            <MyButton type='submit' text={submitButtonText} />
          </Grid>
          {/*------------------------------------------------------------------------------ */}
        </Grid>
      </MyForm>
    </>
  )
}

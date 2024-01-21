import { Typography } from '@mui/material'
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
//components
import { InputSearch, DevNavbar } from '../components'
import  Sidebar  from '../components/ApiPageLayout/sidebar'
//data
import { METHOD, DATATYPE } from '../testdata'


const CreateEndpoint: React.FC = () => {
  const [name, setName] = useState<string>("")
  const [route, setRoute] = useState<string>("/")
  const [method, setMethod] = useState<string>("GET")
  const [description, setDescription] = useState<string>("")
  const classes = useStyles()
  const [requestBody, setRequestBody] = useState<Array<any>>([{ payload: "", dataType: "" }])
  const [showPostComponent, setShowPostComponent] = useState<boolean>(false)

  useEffect(() => {
    method === "POST"
      ? setShowPostComponent(true)
      : setShowPostComponent(false);
  }, [method]);

  const addEndpoint = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({ name, description, route, method, requestBody })
  }

  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    alert("Your inputs will be LOST if you cancel. Do you want to proceed?")
    setName(""); setDescription(""); setMethod(""); setRoute("")
  }

  const addFormField = () => {
    setRequestBody([...requestBody, { payload: "", dataType: "" }]);
  }

  const removeFormField = (i: number | any) => {
    const newBody = [...requestBody];
    newBody.splice(i, 1);
    setRequestBody(newBody);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const newFormValues = [...requestBody];
    newFormValues[i][e.target.name] = e.target.value;
    setRequestBody(newFormValues);
  }

  const handleSelect = (i: number, e: ChangeEvent<HTMLSelectElement>) => {
    const newFormValues = [...requestBody];
    newFormValues[i][e.target.name] = e.target.value;
    setRequestBody(newFormValues);
  }
  return (
    <>
     <DevNavbar />
      <Sidebar />
    <div className={classes.createEndpointPage}>
      {/* <ApiPageSidebar /> */}
      <div className={classes.addEndpoint}>
        <form onSubmit={addEndpoint}>
          <div className={classes.topForm}>
            <Typography variant="h6" gutterBottom className={classes.pageHeading}>Add Endpoint</Typography>
            <div className={classes.actionButtons}>
              <button className={classes.cancelButton} onClick={handleCancel}>Cancel</button>
              <button type="submit" className={classes.addButton}>Save</button>
            </div>
          </div>
          <div className={classes.inputForm}>
            <div className={classes.input}>
              <label>Name</label>
              <input required type='text' name='name' value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} placeholder='Name your endpoint' />
            </div>
            <div className={classes.input}>
              <label>Description</label>
              <textarea required rows={5} name='description' value={description} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} placeholder='Describe what this endpoint does'></textarea>
            </div>
            <div className={classes.endpointRoute}>
              <InputSearch className={classes.select} type="select" name="method" value={method} onSelect={(e: ChangeEvent<HTMLSelectElement>) => setMethod(e.target.value)} data={METHOD} />
              <input className={classes.route} required type='text' name='route' value={route} onChange={(e: ChangeEvent<HTMLInputElement>) => setRoute(e.target.value)} />
            </div>
          </div>
          {showPostComponent && (
            <div className={classes.postForm}>
              {requestBody.map((element, index) => (
                <div key={index} className={classes.formFields}>
                  <input type="text" name="payload" placeholder="Payload Name" value={element.payload || ""} onChange={e => handleChange(e, index)} />
                  <InputSearch type="select" name="dataType" value={element.dataType || ""} onSelect={e => handleSelect(index, e)} data={DATATYPE} placeholder="Data Type" />
                  <div className={classes.actionButtons}>
                    <button disabled={index === 0} onClick={removeFormField}>-</button>
                    <button onClick={addFormField}>+</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </form>
      </div>
    </div>
        </>
  )
}

export default CreateEndpoint

const useStyles = makeStyles({
  createEndpointPage: {
    paddingLeft: "250px",
    paddingTop: "70px",
    background: "#fff",
    width: "100vw",
    display: "flex",
  },
  addEndpoint: {
    padding: "2rem 2rem",
    height: "100vh",
    width: "100vw"
  },
  topForm: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  pageHeading: {
    fontSize: "3rem",
    paddingBottom: "1.5rem",
    fontWeight: 500,
    color: "var(--color-primary)",
  },
  actionButtons: {
    display: "flex",
    gap: "1rem",
    "& button": {
      padding: ".5rem 1rem",
      cursor: "pointer",
    }
  },
  addButton: {
    background: "rgb(108, 142, 209)",
    border: "none",
    outline: "none",
    color: "#fff",
    "&:hover": {
      opacity: "0.5",
      transition: "0.5s",
    }
  },
  cancelButton: {
    border: "1px solid #000",
    outline: "none",
    color: "#000",
    "&:hover": {
      border: "1px solid rgb(108, 142, 209)",
      color: "rgb(108, 142, 209)",
    }
  },
  inputForm: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    display: "flex",
    flexDirection: "column",
    gap: ".3rem",
    "& input, textarea": {
      width: "40%",
      padding: ".8rem .5rem",
      border: "1px solid #ccc",
      borderRadius: "2px",
    }
  },
  endpointRoute: {
    width: "100%",
    display: "flex",
    gap: "2rem"
  },
  select: {
    "& select": {
      width: "100px",
      padding: ".8rem .5rem",
      border: "1px solid #ccc",
      borderRadius: "2px"
    },
  },
  route: {
    width: "50%"
  },
  postForm: {
    display: "flex",
    marginTop: "1.5rem",
    gap: "2rem",
    flexDirection: "column",
  },
  formFields: {
    display: "flex",
    gap: "1rem",
    "& input": {
      padding: ".8rem .5rem",
      border: "1px solid #ccc",
      borderRadius: "2px"
    },
    "& select": {
      width: "100px",
      padding: ".8rem .5rem",
      border: "1px solid #ccc",
      borderRadius: "2px"
    },
  },
})
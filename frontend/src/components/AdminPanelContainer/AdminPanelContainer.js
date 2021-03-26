import { makeStyles } from "@material-ui/core";
import { TEXTS } from "../../helpers/constants/constants";
import General from "./GeneralSection/General"
import Pre from "./Pre/Pre"
import Sales from "./Sales/Sales";

const useStyles = makeStyles(() => ({
  admin_panel: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '10px 50px 0px 50px',
    margin: '0 auto',
    marginBottom: 'auto',
    width: '80%',
    backgroundColor: 'white',
    borderRadius: '20px',
  },
}));

const AdminPanelContainer = () => {
  const classes = useStyles()

  return (
    <div className={classes.admin_panel}>
      <h1>{TEXTS.headAdmin}</h1>
      <General />
      <Pre />
      <Sales />
    </div>
  )
}

export default AdminPanelContainer

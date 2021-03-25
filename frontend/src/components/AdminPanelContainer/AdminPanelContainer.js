import { makeStyles } from "@material-ui/core";
import { TEXTS } from "../../helpers/constants/constants";
import GeneralSection from "./GeneralSection/GeneralSection"
import PreSection from "./PreSection/PreSection"

const useStyles = makeStyles(() => ({
  admin_panel: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '10px 50px 0px 50px',
    margin: '0 auto',
    marginBottom: 'auto',
    width: '800px',
    backgroundColor: 'white',
    borderRadius: '20px',
  },
}));

const AdminPanelContainer = () => {
  const classes = useStyles()

  return (
    <div className={classes.admin_panel}>
      <h1>{TEXTS.headAdmin}</h1>
      <GeneralSection />
      <PreSection />
    </div>
  )
}

export default AdminPanelContainer

import classes from "../styles/Table.module.css";
export default function Table() {
  return (
    <div className={classes.table}>
      <div className={classes.tableHead}>
        <div className={classes.column}>Name</div>
        <div className={classes.column}>Email</div>
        <div className={classes.column}>Phone Number</div>
        {/* <div className={classes.column}>Labels</div> */}
        <div className={classes.column} style={{width: "40px"}}></div>
      </div>
      {/* <div class="tableBody"></div> */}
    </div>
  );
}

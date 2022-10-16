import classes from "../styles/Table.module.css";
export default function Table() {
  return (
    <div class={classes.table}>
      <div class={classes.tableHead}>
        <div class={classes.column}>Name</div>
        <div class={classes.column}>Email</div>
        <div class={classes.column}>Phone Number</div>
        <div class={classes.column}>Labels</div>
        <div class={classes.column} style={{width: "40px"}}></div>
      </div>
      {/* <div class="tableBody"></div> */}
    </div>
  );
}

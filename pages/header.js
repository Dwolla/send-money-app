import styles from "./Header.module.css";

function Header() {
  return (
    <>
      <header className={styles.header}>       
          <p className={styles.text}>Doggie DayCare Freelancer</p>
      </header>
    </>
  );
}

export default Header;

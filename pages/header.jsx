import styles from './Header.module.css';

function Header() {
  return (
    <>
      <header className={styles.header}>
        <p className={styles.text}>Send Money Starter Kit</p>
      </header>
    </>
  );
}

export default Header;

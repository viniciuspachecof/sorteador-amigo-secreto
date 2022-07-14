import styles from './Cabecalho.module.scss'

const Cabecalho = () => {
    return (
        <header className={styles.cabecalho}>
            <div className={styles['imagem-logo']} role="img" aria-label='Logo do Sorteador'></div>
            <img className={styles.participante} src="/assets/participante.png" alt="Participante com um presente na mão" />
        </header>
    )
}

export default Cabecalho
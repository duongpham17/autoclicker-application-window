import styles from './Help.module.scss';
import {mouseEvents, inputFields, commands} from './data';

const Help = () => {

  return (
    <section className={styles.container}>

      <h2>Commands Layering</h2>
      {commands.map(el => 
        <div key={el.event} className={styles.element}>
          <p>{el.event}</p>
          <p>{el.text}</p>
        </div>
      )}

      <h2>Mouse Events</h2>
      {mouseEvents.map(el => 
        <div key={el.event} className={styles.element}>
          <p>{el.event}</p>
          <p>{el.text}</p>
        </div>
      )}

      <h2>Input Fields</h2>
      {inputFields.map(el => 
        <div key={el.field} className={styles.element}>
          <p>{el.field}</p>
          <p>{el.description}</p>
        </div>
      )}
    </section>
  )
}

export default Help
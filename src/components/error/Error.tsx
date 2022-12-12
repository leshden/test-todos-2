import './Error.css';

type Props = {
  message: string;
}

const Error = ({message} : Props) => {
  return (
    <section className='error-container'>
      <p>{message}</p>
    </section>
  )
}

export default Error;

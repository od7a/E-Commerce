import notFoundImg from '../../assets/imgs/undraw_page-not-found_6wni.svg'

export default function NotFound() {
  return (
    <div className='h-screen flex flex-col justify-center items-center gap-6'>
        <img className='w-96' src={notFoundImg} alt="" />
        <a href="/">Back to Home</a>
    </div>
  )
}

import Image from 'next/image'
import SigninButton from './components/SigninButton'

export default function Home() {
  return (
    <main className = 'flex flex-col items-center sans font-bold pt-40'>
      <div className='text-teal-500 text-6xl pt-5'>
        Voice Haven
      </div>
      <div className='text-teal-500 text-5xl sans font-semibold pt-5'>Filter unwanted words from <br /> your community voice chat</div>
      <div className = 'pt-20'>
      <SigninButton />
      </div>
    </main>
  )
}

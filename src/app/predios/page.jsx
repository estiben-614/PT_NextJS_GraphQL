import { Button, Card, DatePicker, Space } from 'antd';
import { AddPredioModal } from '../Components/modal/AddPredioModal'; 
import { PrediosCard } from './PrediosCard';


export default function Home() {

  return (
    <>
      <AddPredioModal></AddPredioModal>  
      <PrediosCard></PrediosCard>
    </>
  )
}

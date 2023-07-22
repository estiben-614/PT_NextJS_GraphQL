import { Button, Card, DatePicker, Space } from 'antd';
import { PrediosCard } from './Components/PrediosCard';
import { AddPredioModal } from './Components/modal/addPredioModal';


export default function Home() {

  return (
    <>
      <AddPredioModal></AddPredioModal>  
      <PrediosCard></PrediosCard>
        
    </>
  )
}

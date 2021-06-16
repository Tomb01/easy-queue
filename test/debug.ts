import { number } from 'yargs'
import {SmartQueue} from '../src/index'

const queue = new SmartQueue<number>()

queue.on((number, done)=>{
    console.log(number)
    done()
})

queue.enqueue(1)
queue.pause()
queue.enqueue(2)
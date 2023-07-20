import {Controller, Logger} from "@nestjs/common";
import {MathService} from "./math.service";
import {GrpcMethod} from '@nestjs/microservices';
import {Metadata, ServerUnaryCall} from "@grpc/grpc-js";


interface INumberArray {
    data: number[];
}

interface ISumOfNumberArray {
    sum: number;
}


@Controller()
export class AppController {

    private logger = new Logger('AppController');

    constructor(
        private mathService: MathService
    ) {
    }


    @GrpcMethod('AppController', 'Accumulate')
    async accumulate(numberArray: INumberArray, metadata: Metadata): Promise<ISumOfNumberArray> {
        this.logger.log('Adding ' + numberArray.data.toString());
        return {sum: this.mathService.accumulate(numberArray.data)};
    }


    @GrpcMethod('AppController', 'AddEvent')
    async AddEvent(numberArray: INumberArray, metadata: Metadata , call: ServerUnaryCall<any, any>) {
        this.logger.log('Event:',numberArray);
        this.logger.log('Metadata: ' + JSON.stringify(metadata));
        this.logger.log('Metadata:', metadata.toJSON());
        this.logger.log('Metadata xxx: ' + metadata.get("xxx"));
        this.logger.log('Metadata:', metadata.getMap());

        const serverMetadata = new Metadata();
        serverMetadata.add('Set-Cookie', 'yummy_cookie=choco');
        call.sendMetadata(serverMetadata);

        return {message: "Hello"}
    }


}
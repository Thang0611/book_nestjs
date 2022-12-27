import { Body, Controller, Get, Param, Post, Res, UseGuards, HttpStatus } from '@nestjs/common';
import { id } from 'aws-sdk/clients/datapipeline';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import RoleGuard from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/emuns/role.enum';
import { OrderService } from './order.service';
import { OrderDto } from '../dto/orderDto';

@Controller('order')
export class OrderController {
    constructor(private orderService:OrderService){}
    @Post()
    @UseGuards(JwtAuthGuard, RoleGuard(Role.User))
    addOrder(@Res() res, @Body() order:OrderDto){
        this.orderService.addToOrder(order)
        .then(data=>{
            console.log(data)
            return res.status(200).json({
                ...data,
                message:["Đặt sách thành công"]
            })
        })
        .catch(err=>{
            console.log(err)
            return res.status(200).json({
                ...err,
                message:["Đặt sách thất bại"]
            })
        })
    }
    @Get("/:id")
    @UseGuards(JwtAuthGuard, RoleGuard(Role.User))
    async getOrder(@Param() param:{id}, @Res() res){
        console.log(param.id)
        const listBook= await this.orderService.getOrder(param.id)
        return res.status(HttpStatus.OK).json(
            listBook
        )

    }

}

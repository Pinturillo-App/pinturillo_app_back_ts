import { AppDataSource } from '../config/data-source.config';
import { CreateRoomDto, UpdateRoomDto } from '../dto/room';
import { Room } from '../entities';


export class RoomRepository {
    private repository = AppDataSource.getRepository(Room);

    public getAllRooms = async () => {
        return this.repository.find();
    }

    public findRoomById = async (id: number) => {
        return this.repository.findOneBy({ id });
    }      

    public findRoomByIdCategory = async (idCategory: number) => {
        return this.repository.find({ where: { idCategory }});
    }

    public createRoom = async (room: CreateRoomDto) => {
        return this.repository.save(room);
    }

    public updateRoom = async (room: UpdateRoomDto) => {
        const { id, ...updateData } = room;

        await this.repository.update({ id }, updateData);
        
        return this.findRoomById(id);
    }

    public deleteRoom = async (id: number) => {
        return this.repository.delete(id);
    }
}
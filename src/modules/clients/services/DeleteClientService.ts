import { injectable, inject } from 'tsyringe';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import AppError from '@shared/errors/AppError';
@injectable()
class DeleteClientService {
  constructor(
    @inject('ClientsRepository')
    private clientRepository: IClientsRepository,
  ) {}

  public async execute(id: string): Promise<number> {
    if (!id) {
      throw new AppError('Invalid client.');
    }

    const findClient = await this.clientRepository.findById(id);

    if (!findClient) {
      throw new AppError('Client not found.');
    }

    const results = await this.clientRepository.delete(id);

    return results as number;
  }
}

export default DeleteClientService;

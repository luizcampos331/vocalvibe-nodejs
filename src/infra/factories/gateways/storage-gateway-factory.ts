import DatabaseConfig from '@/infra/database/postgre-sql/postgres-sql-database-config';
import { InfrastructureError } from '@/infra/errors/infrastructure-error';
import DiskStorageGateway from '@/infra/gateways/storage/disk-storage-gateway';
import { env } from '@/main';

const implementations = {
  disk: new DiskStorageGateway(),
};

class StorageGatewayFactory {
  public make() {
    if (!Object.keys(this).includes(env.STORAGE_IMPLEMENTATION)) {
      throw new InfrastructureError('Invalid gateway implementation - storage');
    }
    return implementations[env.STORAGE_IMPLEMENTATION];
  }
}

export default StorageGatewayFactory;

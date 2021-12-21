import { EntityDataModuleConfig, EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Jobs: {},
};

const pluralNames = { Jobs: 'Jobs' };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};

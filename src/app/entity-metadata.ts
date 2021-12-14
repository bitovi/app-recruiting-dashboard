import { EntityDataModuleConfig, EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Applicants: {},
  Jobs: {},
};

const pluralNames = { Applicants: 'Applicants', Jobs: 'Jobs' };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};

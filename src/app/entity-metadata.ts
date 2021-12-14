import {EntityDataModuleConfig, EntityMetadataMap} from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Applicants: {},
};

const pluralNames = { Applicants: 'Applicants' };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};

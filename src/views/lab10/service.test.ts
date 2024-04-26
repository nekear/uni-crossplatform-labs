import {beforeEach, describe, expect, it} from 'vitest';
import {EnterprisesManager} from './service';

describe('EnterprisesManager', () => {
    let enterprisesManager: EnterprisesManager;

    beforeEach(() => {
        enterprisesManager = new EnterprisesManager();
    });

    it('should initialize with empty cities and enterprises lists', () => {
        expect(enterprisesManager.citiesList$.value).toEqual([]);
        expect(enterprisesManager.enterprisesList$.value).toEqual([]);
        expect(enterprisesManager.currentCityId$.value).toBeUndefined();
    });

    it('should add a new city', () => {
        enterprisesManager.addCity('New York');

        expect(enterprisesManager.citiesList$.value).toHaveLength(1);
        expect(enterprisesManager.citiesList$.value[0].name).toBe('New York');
    });

    it('should add a new enterprise', () => {
        const enterprise = {name: 'Acme Inc', city_id: '1'};
        enterprisesManager.addEnterprise(enterprise);

        expect(enterprisesManager.enterprisesList$.value).toHaveLength(1);
        expect(enterprisesManager.enterprisesList$.value[0].name).toBe('Acme Inc');
        expect(enterprisesManager.enterprisesList$.value[0].city_id).toBe('1');
    });

    it('should set the current city', () => {
        enterprisesManager.setCurrentCity('1');

        expect(enterprisesManager.currentCityId$.value).toBe('1');
    });
});

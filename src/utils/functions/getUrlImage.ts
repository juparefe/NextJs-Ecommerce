import { ENV } from '../constants';

export function getUrlImage(imageName: string) {
	return `${ENV.IMG_URL}/${imageName}.jpg`;
}

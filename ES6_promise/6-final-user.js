import signUpUser from './4-user-promise';
import uploadPhoto from './5-photo-reject';

export default function handleProfileSignup(firstName, lastName, filename) {
  const user = signUpUser(firstName, lastName);
  const photo = uploadPhoto(filename);

  return Promise.allSettled([user, photo])
    .then((results) => results.map((result) => ({
      status: result.status,
      value: result.status === 'fulfilled' ? result.result : result.reason,
    })));
}

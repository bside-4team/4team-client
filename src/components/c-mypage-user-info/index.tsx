import useLogoutMutate from '@/app/login/hooks/useLogoutMutate';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import { MODAL_TYPES } from '../Modal/GlobalModal';
import useModal from '../Modal/GlobalModal/hooks/useModal';

export default function CMyPageUserInfo() {
  const { data, token } = useUser();
  const { openModal, closeModal } = useModal();
  const { mutate: logoutMutate } = useLogoutMutate();
  const router = useRouter();

  const getShortAddress = (address?: string) => {
    if (!address) return;

    return address.split(' ').slice(0, 2).join(' ');
  };

  const boxLabel = 'text-12 font-normal leading-[100% text-neutral-bg30';

  const logoutModal = () => {
    openModal(MODAL_TYPES.dialog, {
      title: '로그아웃 하시겠습니까?',
      cancelText: '취소',
      needClose: true,
      handleClose: () => closeModal(MODAL_TYPES.dialog),
      handleConfirm: () => {
        if (token) logoutMutate({ token });
      },
    });
  };

  const areaModal = () => {
    openModal(MODAL_TYPES.dialog, {
      title: '지역 설정 안내',
      elementMessage: (
        <ul className="list-outside list-disc pl-[1em]">
          <li className="text-12 font-normal leading-[160%] text-neutral-bg40 last:mt-10">
            식사 지역 : 식당 추첨 시 기준 위치로 사용되며, 설정한 식사 지역으로부터 700m 이내의 식당을 추천합니다.
          </li>

          <li className="text-12 font-normal leading-[160%] text-neutral-bg40 last:mt-10">
            활동 지역 : 리뷰 작성 시 기준 위치로 사용되며, 활동 지역으로부터 1km 이내의 식당에 한해 리뷰 작성이
            가능합니다.
          </li>
        </ul>
      ),
      handleConfirm: () => closeModal(MODAL_TYPES.dialog),
    });
  };

  return (
    <div className="pd-10 w-full px-20 pt-40">
      <div className="mb-20 flex items-center justify-between">
        <span className="text-20 font-normal leading-[100%]">{data?.nickname}</span>

        <button className="text-14 font-normal leading-[100%] text-neutral-bg40" onClick={logoutModal}>
          로그아웃 {'>'}
        </button>
      </div>

      <div className="mb-20 text-12 font-normal leading-[100%] text-neutral-bg40">{data?.account?.accountEmail}</div>

      <div className="mb-14 flex">
        <div
          className="flex w-full cursor-pointer items-center justify-between border-1 border-solid border-neutral-bg10 bg-neutral-bg05 px-12 py-14"
          onClick={() => router.push('mypage/region-setting?category=dining_area')}
        >
          <span className={boxLabel}>식사 지역</span>

          <span className={`${boxLabel} text-neutral-bg80`}>{getShortAddress(data?.area?.diningArea?.address)}</span>
        </div>

        <div
          className="flex w-full cursor-pointer items-center justify-between border-1 border-solid border-neutral-bg10 bg-neutral-bg05 px-12 py-14"
          onClick={() => router.push('mypage/region-setting?category=activity_area')}
        >
          <span className={boxLabel}>활동 지역</span>

          <span className={`${boxLabel} text-neutral-bg80`}>{getShortAddress(data?.area?.activityArea?.address)}</span>
        </div>
      </div>

      <div className="w-full text-center">
        <span
          className="cursor-pointer text-12 font-normal leading-[100%] text-neutral-bg20 underline"
          onClick={areaModal}
        >
          식사 지역과 활동 지역은 어떤 차이인가요?
        </span>
      </div>
    </div>
  );
}

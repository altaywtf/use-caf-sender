const useCastReceiver = () => {
  const session = window.cast.framework.CastContext.getInstance().getCurrentSession();

  if (!session) {
    return [new Error('No session'), null] as const;
  }

  return [null, session.getCastDevice()] as const;
};

export default useCastReceiver;

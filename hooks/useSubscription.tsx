import { useEffect, useState } from "react";
import {
  onCurrentUserSubscriptionUpdate,
  Subscription,
} from "@stripe/firestore-stripe-payments";
import payments from "../lib/stripe";
import { User } from "firebase/auth";

function useSubscription(user: User | null) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  // manages subscription to the stripe
  useEffect(() => {
    if (!user) return;

    onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
      setSubscription(
        snapshot.subscriptions.filter(
          (subscription) =>
            subscription.status == "active" || subscription.status == "trialing"
        )[0]
      );
    });
  }, []);

  return subscription
}

export default useSubscription;

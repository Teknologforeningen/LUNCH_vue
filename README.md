# LUNCH

## Deployment

For deploying LUNCH to the test server, simpy run:

```
ansible-playbook -i dvalin.tf.fi, --user $YOUR_USERNAME --private-key /some/path/to/$PRIVATEKEY
```

This requires that you have `ansible` installed and your public key deployed to the server. The playbook will then:

1. Install dependencies
1. Build the site locally with `npm run build` and rsync `dist/` to the server
1. Create a `systemd` unit for running the backend and starting it
1. Configure `nginx`

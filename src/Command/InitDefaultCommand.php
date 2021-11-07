<?php

namespace App\Command;

use App\Entity\Demo;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class InitDefaultCommand extends Command {
	protected static $defaultName = 'app:init-default';
	protected static $defaultDescription = 'Initialize default setting and data';
	private $entityManager;
	private $userPasswordHasher;

	public function __construct(
		EntityManagerInterface $entityManager,
		UserPasswordHasherInterface $userPasswordHasher
	) {
		$this->entityManager = $entityManager;
		$this->userPasswordHasher = $userPasswordHasher;
		parent::__construct();
	}

	protected function execute(InputInterface $input, OutputInterface $output): int{
		$this->nuke();

		$admin = new User();
		$admin
			->setIdentifier('admin')
			->setPassword(
				$this->userPasswordHasher->hashPassword($admin, 'admin')
			)
			->setRoles(['ROLE_ADMIN']);
		$this->entityManager->persist($admin);

		$demo = new Demo();
		$this->entityManager->persist($demo);

		$this->entityManager->flush();

		$io = new SymfonyStyle($input, $output);
		$io->success('Initialized app default settings and data!');

		return Command::SUCCESS;
	}

	private function nuke(): void{
		exec("export APP_ENV=dev");
		exec("rm -f ./migrations/*.php");
		exec("rm -rf ./public/media");
		exec("mkdir -p ./public/media");
		exec("php ./bin/console cache:clear");
		exec("php ./bin/console doctrine:schema:drop --full-database --force || true");
		exec("php ./bin/console doctrine:database:create");
		exec("php ./bin/console make:migration -n");
		exec("php ./bin/console doctrine:migrations:migrate -n");
	}
}

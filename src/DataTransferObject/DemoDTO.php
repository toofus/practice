<?php

namespace App\DataTransferObject;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Validator\Constraints as Assert;

class DemoDTO implements \JsonSerializable
{
	/**
	 * @Assert\NotBlank
	 * @Assert\Length(min = 5)
	 */
	public $name;

	/**
	 * @Assert\NotBlank
	 * @Assert\Length(min = 5)
	 */
	public $phone;

	/**
	 * @Assert\NotBlank
	 * @Assert\Image(
	 *  mimeTypes = "image/*",
     *  maxSize = "1M"
	 * )
	 */
	public $upload;

	public function __construct($name, $phone, UploadedFile $upload = null)
	{
		$this->name = $name;
		$this->phone = $phone;
		$this->upload = $upload;
	}

	public function jsonSerialize()
	{
		return [
			'name' => $this->name,
			'phone' => $this->phone,
			'media' => $this->upload->getClientOriginalName()
		];
	}
}
